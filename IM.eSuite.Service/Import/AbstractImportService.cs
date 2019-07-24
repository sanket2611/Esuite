using System.Threading.Tasks;
using IM.NETCore.Core.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using NPOI.SS.UserModel;

namespace IM.eSuite.Service
{
    public abstract class AbstractImportService: IImportService
    {
        private const string excelExtension = ".xlsx";
        private const long fileSizeLimit = 512000; //512000B = 500kB
        protected abstract string[] rowHeader { get; }
        
        protected readonly IRepository<DbContext> _repository;

        public AbstractImportService(IRepository<DbContext> repository)
        {
            _repository = repository;
        }

        public string ValidateFile(IFormFile file)
        {
            if(!file.FileName.EndsWith(excelExtension)){
                return "File extension is invalid";
            }

            if(file.Length > fileSizeLimit){
                return "File size is limited to 500kB";
            }

            return null;
        }        

        protected bool isValidHeaderRow(IRow row)
        {
            if(row == null || row.Cells.Count != rowHeader.Length)
            {
                return false;
            }

            for(var i = 0; i < row.Cells.Count; i++)
            {
                if(row.Cells[i].StringCellValue != rowHeader[i])
                {
                    return false;
                }
            }
            return true;
        }

        public abstract Task<ImportResult> Import(IFormFile file);
    }
}