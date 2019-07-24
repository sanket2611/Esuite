using Microsoft.Extensions.DependencyInjection;
using RawRabbit;
using RawRabbit.Configuration;
using RawRabbit.DependencyInjection.ServiceCollection;
using RawRabbit.Instantiation;

namespace IM.eSuite.API.ServicesConfiguration
{
    public static class RawRabbitServiceConfiguration
    {
        public static void ConfigureRawRabbit(IServiceCollection services, RawRabbitConfiguration configuration)
        {
            var options = new RawRabbitOptions {
                ClientConfiguration = configuration,
                Plugins = p => p.UseAttributeRouting()
            };

            services.AddRawRabbit(options);
        }
    }
}