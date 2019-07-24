using System;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using IM.eSuite.Data;
using IM.eSuite.Domain;
using IM.NETCore.Core.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.Configuration;

namespace IM.eSuite.DataMigrationTool
{
    public class UserPlantStep
    {
        private static readonly string FetchQuery = "SELECT distinct u.U_Login_Id, e.[cif] FROM SMAT_M_User_Rights ur left join SMAT_M_Users u on ur.UR_User_Id=u.U_User_Id left join ENTITY e on e.ID = ur.UR_Plant where u.U_Login_SSO = 1 and e.cif is not null";

        public static void Process(SqlConnection conn, IRepository<eSuiteDbContext> repository)
        {
            var dr = Fetch(conn);
            var count = 0;
            var skipped = 0;
            while (dr.Read())
            {
                var entity = Map(repository, dr);
                if (entity.UserId != default(int) && entity.PlantId != default(int)) {
                    Console.WriteLine("adding entry " + (++count).ToString());
                    repository.Add(entity);
                }
                else {
                    Console.WriteLine("skipping entry " + (++skipped).ToString());
                }
            }
            repository.Save();

            Console.WriteLine(nameof(UserPlantStep) + " count: " + count.ToString());
            Console.WriteLine(nameof(UserPlantStep) + " skipped: " + skipped.ToString());
        }

        public static SqlDataReader Fetch(SqlConnection conn)
        {
            var cmd = new SqlCommand(FetchQuery, conn); 
            var dr = cmd.ExecuteReader();
            return dr;
        }

        private static int LookUpUser(IRepository<eSuiteDbContext> repository, string userName)
        {
            var conn = (SqlConnection)repository.Context.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open) {
                conn.Open();
            }

            var cmd = new SqlCommand("select Id FROM [User] where [UserName] = @UserName", conn); 
            cmd.Parameters.AddWithValue("UserName", userName);
            var ret = cmd.ExecuteScalar();
            return ret != null ? (int)ret : default(int);
        }

        public static UserPlant Map(IRepository<eSuiteDbContext> repository, SqlDataReader dr)
        {
            var entity = new UserPlant();
            entity.UserId = LookUpUser(repository, Convert.ToString(dr["U_Login_Id"]));
            entity.PlantId = Lookups.LookUpPlant(repository, Convert.ToString(dr["cif"]));
            return entity;
        }
    }
}
