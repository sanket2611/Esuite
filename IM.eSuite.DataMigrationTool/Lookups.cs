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
    public static class Lookups
    {
        public static int LookUpXref(IRepository<eSuiteDbContext> repository, int sourceId, string entity)
        {
            var conn = (SqlConnection)repository.Context.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }

            var cmd = new SqlCommand("SELECT DestinationId FROM Xref WHERE [SourceId] = @sourceId AND Entity = @entity", conn);
            cmd.Parameters.AddWithValue("sourceId", sourceId);
            cmd.Parameters.AddWithValue("entity", entity);
            var ret = cmd.ExecuteScalar();
            return ret != null ? (int)ret : default(int);
        }

        public static int LookUpDepartmentByName(IRepository<eSuiteDbContext> repository, string deptName)
        {
            var conn = (SqlConnection)repository.Context.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }

            var cmd = new SqlCommand("select Id FROM [Organization] where [Name] = @DeptName AND Type = 1", conn);
            cmd.Parameters.AddWithValue("DeptName", deptName);
            var ret = cmd.ExecuteScalar();
            return ret != null ? (int)ret : default(int);
        }

        public static int LookUpWorkshopByName(IRepository<eSuiteDbContext> repository, string wsName)
        {
            var conn = (SqlConnection)repository.Context.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }

            var cmd = new SqlCommand("select Id FROM [Organization] where [Name] = @WsName AND Type = 2", conn);
            cmd.Parameters.AddWithValue("WsName", wsName);
            var ret = cmd.ExecuteScalar();
            return ret != null ? (int)ret : default(int);
        }

        public static int LookUpJobByName(IRepository<eSuiteDbContext> repository, string jobName)
        {
            var conn = (SqlConnection)repository.Context.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }

            var cmd = new SqlCommand("select Id FROM [Organization] where [Name] = @JobName AND Type = 3", conn);
            cmd.Parameters.AddWithValue("JobName", jobName);
            var ret = cmd.ExecuteScalar();
            return ret != null ? (int)ret : default(int);
        }

        public static int LookUpWorkstationByName(IRepository<eSuiteDbContext> repository, string workstationName)
        {
            var conn = (SqlConnection)repository.Context.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }

            var cmd = new SqlCommand("select Id FROM [Organization] where [Name] = @WorkstationName AND Type = 4", conn);
            cmd.Parameters.AddWithValue("WorkstationName", workstationName);
            var ret = cmd.ExecuteScalar();
            return ret != null ? (int)ret : default(int);
        }

        public static int LookUpPlant(IRepository<eSuiteDbContext> repository, string gaiaCode)
        {
            var conn = (SqlConnection)repository.Context.Database.GetDbConnection();
            if (conn.State != ConnectionState.Open)
            {
                conn.Open();
            }

            var cmd = new SqlCommand("SELECT Id FROM Plant WHERE [GaiaCode] = @gaiaCode", conn);
            cmd.Parameters.AddWithValue("gaiaCode", gaiaCode);
            var ret = cmd.ExecuteScalar();
            return ret != null ? (int)ret : default(int);
        }
    }
}
