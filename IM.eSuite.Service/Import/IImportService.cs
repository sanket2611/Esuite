using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace IM.eSuite.Service
{
    public interface IImportService
    {
        string ValidateFile(IFormFile file);
        Task<ImportResult> Import(IFormFile file);
    }
}