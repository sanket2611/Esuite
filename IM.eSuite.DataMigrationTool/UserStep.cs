using System;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using IM.eSuite.Data;
using IM.eSuite.Domain;
using IM.NETCore.Core.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.Configuration;

namespace IM.eSuite.DataMigrationTool
{
    public class UserStep
    {
        private static readonly string FetchQuery = "SELECT * FROM SMAT_M_Users where [U_Login_SSO] = 1";

        public static void Process(SqlConnection conn, IRepository<eSuiteDbContext> repository)
        {
            // remove all user and userplant entries first
            repository.GetAll<UserPlant>().ToList().ForEach(repository.Delete);
            repository.GetAll<UserGroupUser>().ToList().ForEach(repository.Delete);
            repository.GetAll<User>().ToList().ForEach(repository.Delete);
            repository.Save();

            var dr = Fetch(conn);
            var count = 1;
            var skipped = 0;
            while (dr.Read())
            {
                var entity = Map(dr);
                if (entity != null) {
                    Console.WriteLine("adding entry " + (++count).ToString());
                    repository.Add(entity);
                }
                else {
                    Console.WriteLine("skipping entry " + (++skipped).ToString());
                }
            }
            repository.Save();

            Console.WriteLine(nameof(UserStep) + " count: " + count.ToString());
            Console.WriteLine(nameof(UserStep) + " skipped: " + skipped.ToString());
        }

        public static SqlDataReader Fetch(SqlConnection conn)
        {
            var cmd = new SqlCommand(FetchQuery, conn); 
            var dr = cmd.ExecuteReader();
            return dr;
        }

        public static User Map(SqlDataReader dr)
        {
            var entity = new User();
            entity.Email = Convert.ToString(dr["U_Email_Id"]);
            entity.FirstName = Convert.ToString(dr["U_First_Name"]);
            entity.IsDeleted = !Convert.ToBoolean(dr["U_Active"]);
            entity.LastName = Convert.ToString(dr["U_Last_Name"]);
            entity.UserName = Convert.ToString(dr["U_Login_Id"]);
            return entity;
        }
    }
}
