using System;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using NLog.Extensions.Logging;
using IM.NETCore.Core.Linq;
using IM.NETCore.Core.Logging;
using IM.NETCore.Core.Logging.NLog;
using IM.NETCore.Infrastructure.AutofacDI;
using IM.NETCore.Infrastructure.AutofacDI.Module;
using IM.NETCore.Web.Jwt;
using IM.eSuite.API.Configuration;
using IM.eSuite.API.ServicesConfiguration;
using IM.eSuite.Data;
using IM.eSuite.Service;
using RawRabbit.Configuration;
using RawRabbit;

namespace IM.eSuite.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IContainer ApplicationContainer { get; private set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", false, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true, true);
            
            if(env.IsEnvironment("Local")){
                builder.AddUserSecrets<Startup>();
            }
            Configuration = builder.Build();            
        }        

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc().AddControllersAsServices();
            
            var nlogConfiguration = Configuration.GetSection("NLog").Get<NLogConfiguration>();
            NLogServiceConfiguration.ConfigureNLog(nlogConfiguration);

            ConfigurationDtoConfiguration.ConfigureConfigurationDto(services, Configuration);

            var connectionString = Configuration.GetConnectionString("eSuiteConnection");
            DbContextOptionsConfiguration.ConfigureDbContextOptions(services, connectionString);
            
            var corsConfiguration = Configuration.GetSection("Cors").Get<CorsConfiguration>();
            CorsServiceConfiguration.ConfigureCorsService(services, corsConfiguration);

            var jwtConfiguration = Configuration.GetSection("Jwt").Get<JwtConfiguration>();
            JwtServiceConfiguration.ConfigureJwtService(services, jwtConfiguration); 

            var swaggerConfiguration = Configuration.GetSection("Swagger").Get<SwaggerConfiguration>();
            SwaggerServiceConfiguration.ConfigureSwaggerService(services, swaggerConfiguration);

            var rawRabbitConfiguration = Configuration.GetSection("RawRabbit").Get<RawRabbitConfiguration>();
            RawRabbitServiceConfiguration.ConfigureRawRabbit(services, rawRabbitConfiguration);

            AuthorizationConfiguration.ConfigureAuthorization(services);
            AutoMapperConfiguration.ConfigureAutoMapper();

            // Create the container builder.
            var builder = new ContainerBuilder();
            builder.Populate(services);

            /*  Register here all modules, type*/
            builder.RegisterModule<EFModule<eSuiteDbContext>>();

            var autofacConfiguration = Configuration.GetSection("Autofac").Get<AutofacConfiguration>();            
            builder.RegisterModule(new StandardModule { AssemblyNames = autofacConfiguration.CandidateAssemblies });
                  
            ApplicationContainer = builder.Build();

            // Create the IServiceProvider based on the container.
            return new AutofacServiceProvider(ApplicationContainer);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, 
            IHostingEnvironment env,
            ILoggerFactory loggerFactory, 
            DbContext context,
            IRepository<DbContext> repository,
            IOptions<CorsConfiguration> corsConfiguration,
            IOptions<SwaggerConfiguration> swaggerConfiguration,
            IApplicationLifetime appLifetime)
        {
            loggerFactory.AddNLog();            

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();                             
            }
            app.UseErrorHandling();

            app.UseCors(corsConfiguration.Value.PolicyName);
            app.UseAuthentication();
            app.UseStaticFiles();
            app.UseMvc();
            
            if(!env.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c => {
                    c.SwaggerEndpoint(swaggerConfiguration.Value.Endpoint, swaggerConfiguration.Value.Title);
                });
            }

            DbInitializer.Initialize(context, repository);

            //Dispose resources that have been resolved
            appLifetime.ApplicationStopped.Register(() => ApplicationContainer.Dispose());
        }
    }
}