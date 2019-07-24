﻿using System;
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
    public class Organization5Step
    {
        private static readonly string FetchQuery = "SELECT t.*, m.MACH_Machine_Name FROM SMAT_M_Task t left join [SMAT_M_Machines] m on t.Task_MachineID = m.MACH_Id WHERE MACH_Machine_Name is not null";

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
                    xrefs.Add(Convert.ToInt32(dr["Task_ID"]), entity);
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

            Console.WriteLine(nameof(Organization5Step) + " count: " + count.ToString());
            Console.WriteLine(nameof(Organization5Step) + " skipped: " + skipped.ToString());
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

            var cmd = new SqlCommand("INSERT INTO [dbo].[Xref] ([SourceId] ,[DestinationId] ,[Entity]) VALUES (@SourceId, @DestinationId, 'Task')", conn);
            cmd.Parameters.AddWithValue("SourceId", sourceId);
            cmd.Parameters.AddWithValue("DestinationId", destinationId);
            cmd.ExecuteNonQuery();
        }

        public static Organization Map(IRepository<eSuiteDbContext> repository, SqlDataReader dr)
        {
            // lookup xref => lookup by name if not found
            var parentId = Lookups.LookUpXref(repository, Convert.ToInt32(dr["Task_MachineID"]), "Workstation");
            if (parentId == default(int))
            {
                return null;
            }

            var entity = new Organization();
            entity.IsDeleted = !Convert.ToBoolean(dr["Task_Active"]);
            entity.Name = Convert.ToString(dr["Task_Name"]);
            entity.ParentId = parentId;
            entity.Type = OrganizationLevelType.Task;
            return entity;
        }
    }
}
