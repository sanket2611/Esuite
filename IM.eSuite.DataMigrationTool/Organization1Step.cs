using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using IM.eSuite.Common;
using IM.eSuite.Data;
using IM.eSuite.Domain;
using IM.NETCore.Core.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.CommandLineUtils;
using Microsoft.Extensions.Configuration;

namespace IM.eSuite.DataMigrationTool
{
    public class Organization1Step
    {
        private static readonly string FetchQuery = "SELECT d.*, p.[cif] FROM [SMAT_M_Department] d left join [ENTITY] p on d.DEPT_Plant = p.Id where p.cif is not null";

        public static void Process(SqlConnection conn, IRepository<eSuiteDbContext> repository)
        {
            var dr = Fetch(conn);
            var count = 0;
            var skipped = 0;
            var xrefs = new Dictionary<int, Organization>();
            while (dr.Read())
            {
                var entity = Map(repository, dr);
                if (entity != null)
                {
                    Console.WriteLine("adding entry " + (++count).ToString());
                    repository.Add(entity);
                    xrefs.Add(Convert.ToInt32(dr["DEPT_Id"]), entity);
                }
                else
                {
                    Console.WriteLine("skipping entry " + (++skipped).ToString());
                }
            }
            repository.Save();

            // add to xref table - key: sourceId, value: destinationid
            foreach (var sourceId in xrefs.Keys)
            {
                AddToXref(repository, sourceId, xrefs[sourceId].Id);
            }

            Console.WriteLine(nameof(Organization1Step) + " count: " + count.ToString());
            Console.WriteLine(nameof(Organization1Step) + " skipped: " + skipped.ToString());
        }

        public static SqlDataReader Fetch(SqlConnection conn)
        {
            var cmd = new SqlCommand(FetchQuery, conn);
            var dr = cmd.ExecuteReader();
            return dr;
        }

        private static void AddToXref(IRepository<eSuiteDbContext> repository, int sourceId, int destinationId)
        {
            var conn = (SqlConnection)repository.Context.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }

            var cmd = new SqlCommand("INSERT INTO [dbo].[Xref] ([SourceId] ,[DestinationId] ,[Entity]) VALUES (@SourceId, @DestinationId, 'Department')", conn);
            cmd.Parameters.AddWithValue("SourceId", sourceId);
            cmd.Parameters.AddWithValue("DestinationId", destinationId);
            cmd.ExecuteNonQuery();
        }

        public static Organization Map(IRepository<eSuiteDbContext> repository, SqlDataReader dr)
        {
            // lookup plant by in plant table by plant name
            var plantId = Lookups.LookUpPlant(repository, Convert.ToString(dr["cif"]));
            if (plantId == default(int))
            {
                return null;
            }

            var entity = new Organization();
            entity.IsDeleted = !Convert.ToBoolean(dr["DEPT_Active"]);
            entity.Name = Convert.ToString(dr["DEPT_Department_Name"]);
            entity.PlantId = plantId;
            entity.Type = OrganizationLevelType.Department;
            return entity;
        }
    }
}
