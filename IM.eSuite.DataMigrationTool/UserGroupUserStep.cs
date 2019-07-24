using System;
using System.Collections.Generic;
using System.Data;
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
    public class UserGroupUserStep
    {
        private static readonly string FetchQuery = "SELECT distinct u.U_Login_Id, max(ut.UT_Role_Id), (select ut2.[UT_User_Type] from SMAT_M_User_Type ut2 where ut2.UT_Role_Id = max(ut.UT_Role_Id)) as UT_User_Type FROM [SMAT_M_User_Rights]  ur   inner join SMAT_M_Users u on ur.UR_User_Id = u.U_User_Id    inner join SMAT_M_User_Type ut on ut.UT_Role_Id = ur.UR_Role_Id     where [UR_Active]=1 and u.U_Login_SSO=1  and u.U_Login_Id <> '' 	group by u.U_Login_Id";

        public static void Process(SqlConnection conn, IRepository<eSuiteDbContext> repository)
        {
            var dr = Fetch(conn);
            var count = 0;
            var skipped = 0;
            
            try 
            {
                repository.Context.ChangeTracker.AutoDetectChangesEnabled = false;
                    
                while (dr.Read())
                {
                    var entities = Map(repository, dr);
                    if (entities.Any())
                    {
                        entities.ToList().ForEach(repository.Add);
                        Console.WriteLine("adding entry " + (++count).ToString());

                    }
                    else
                    {
                        Console.WriteLine("skipping entry " + (++skipped).ToString());
                    }
                }
                repository.Save();
            }
            finally 
            {
                repository.Context.ChangeTracker.DetectChanges();
                repository.Context.SaveChanges();
            }

            Console.WriteLine(nameof(UserGroupUserStep) + " count: " + count.ToString());
            Console.WriteLine(nameof(UserGroupUserStep) + " skipped: " + skipped.ToString());
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
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }

            var cmd = new SqlCommand("select Id FROM [User] where [UserName] = @UserName", conn);
            cmd.Parameters.AddWithValue("UserName", userName);
            var ret = cmd.ExecuteScalar();
            return ret != null ? (int)ret : default(int);
        }

        private static int LookUpApplicationUserGroup(IRepository<eSuiteDbContext> repository, string applicationName, string applicationUserGroupName)
        {
            var conn = (SqlConnection)repository.Context.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }

            var cmd = new SqlCommand("SELECT aug.Id FROM [ApplicationUserGroup] aug inner join [Application] a on aug.ApplicationId = a.Id where a.Name = @applicationName and aug.Name=@applicationUserGroupName", conn);
            cmd.Parameters.AddWithValue("applicationName", applicationName);
            cmd.Parameters.AddWithValue("applicationUserGroupName", applicationUserGroupName);
            var ret = cmd.ExecuteScalar();
            return ret != null ? (int)ret : default(int);
        }

        public static IEnumerable<UserGroupUser> Map(IRepository<eSuiteDbContext> repository, SqlDataReader dr)
        {
            var ret = new List<UserGroupUser>();

            var userId = LookUpUser(repository, Convert.ToString(dr["U_Login_Id"]));

            var uguESmat = new UserGroupUser();
            uguESmat.UserId = userId;
            uguESmat.ApplicationUserGroupId = LookUpApplicationUserGroup(repository, "eSmat", Convert.ToString(dr["UT_User_Type"]));
            if (uguESmat.UserId != default(int) && uguESmat.ApplicationUserGroupId != default(int))
            {
                ret.Add(uguESmat);
            }

            var uguESuite = new UserGroupUser();
            uguESuite.UserId = userId;
            uguESuite.ApplicationUserGroupId = LookUpApplicationUserGroup(repository, "eSuite", "User");
            if (uguESuite.UserId != default(int) && uguESuite.ApplicationUserGroupId != default(int))
            {
                ret.Add(uguESuite);
            }

            var uguEAction = new UserGroupUser();
            uguEAction.UserId = userId;
            uguEAction.ApplicationUserGroupId = LookUpApplicationUserGroup(repository, "eAction", Convert.ToString(dr["UT_User_Type"]).Replace("SMAT Leader", "Action Leader"));
            if (uguEAction.UserId != default(int) && uguEAction.ApplicationUserGroupId != default(int))
            {
                ret.Add(uguEAction);
            }

            return ret;
        }
    }
}
