using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace IM.eSuite.Service
{
    public class DirectoryApiService : IDirectoryApiService
    {
        private readonly IOptions<DirectoryApiConfiguration> _configuration;
        
        public DirectoryApiService(IOptions<DirectoryApiConfiguration> configuration)
        {
            _configuration = configuration;
        }

        public async Task<DirectoryApiUser> GetUserBySGId(string sgId)
        {
            string fields = "stGoSGI,givenName,mail,sn";
            var url = $"{_configuration.Value.Url}/{sgId}?keyID={_configuration.Value.KeyId}&_fields={fields}";
            using(var httpClient = new HttpClient())
            {  
                var response = await httpClient.GetAsync(url);
                if(response.StatusCode != HttpStatusCode.OK)
                {
                    return null;
                }
                var content = response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<DirectoryApiUser>(content.Result);
            }
        }

        public async Task<IEnumerable<string>> GetEmailByName(string name)
        {
            string fields = "mail";
            string queryFilter = $"(sn sw '{name}' or givenName sw '{name}')";
            var url = $"{_configuration.Value.Url}?keyID={_configuration.Value.KeyId}&_fields={fields}&_queryFilter={queryFilter}";
            using(var httpClient = new HttpClient())
            {  
                var response = await httpClient.GetAsync(url);
                if(response.StatusCode != HttpStatusCode.OK)
                {
                    return null;
                }
                var content = response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<DirectoryApiUserListResult>(content.Result);
                return result.Result.Where(u => !string.IsNullOrWhiteSpace(u.Mail)).Select(u => u.Mail);
            }
        }
    }
}