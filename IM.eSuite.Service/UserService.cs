using System.Threading.Tasks;
using IM.eSuite.Domain;
using RawRabbit;
using IM.eSuite.Common;
using IM.NETCore.Core.Linq;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace IM.eSuite.Service
{
    public class UserService : IUserService
    {
        private readonly IRepository<DbContext> _repository;
        private readonly IBusClient _busClient;
        private readonly ILogger<UserService> _logger;

        public UserService(IRepository<DbContext> repository, IBusClient busClient, ILogger<UserService> logger)
        {
            _repository = repository;
            _busClient = busClient;
            _logger = logger;
        }

        public async Task PublishSaveEventAsync(int userId)
        {
            var dbUser = _repository.FindBy<User>(u => u.Id == userId)                
                .Include(u => u.UserGroups)
                .ThenInclude(ug => ug.ApplicationUserGroup)
                .Include(u => u.Plants)
                .FirstOrDefault();

            if (dbUser == null)
            {
                _logger.LogError($"User with id {userId} has not been found in the database. Cannot publish save event.");
                return;
            }

            var plants = dbUser.Plants.Select(up => new UserPlantSaved {
                    UserId = up.UserId, 
                    PlantId = up.PlantId
                }
            ).ToArray();

            var userGroups = dbUser.UserGroups.ToList().Select(ug => new UserGroupSaved {
                    Id = ug.ApplicationUserGroupId
                }
            ).ToArray();

            var user = new UserSaved {
                Id = dbUser.Id,
                UserName = dbUser.UserName,
                FirstName = dbUser.FirstName,
                LastName = dbUser.LastName,
                Email = dbUser.Email,
                IsDeleted = dbUser.IsDeleted,                
                Plants = plants,
                Groups = userGroups
            };

            await _busClient.PublishAsync<UserSaved>(user);
        }
    }
}