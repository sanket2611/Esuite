using System.IO;
using System.Linq;
using IM.eSuite.Data;
using IM.eSuite.Domain;
using IM.NETCore.Core.Linq;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace IM.eSuite.Console
{
    public class PlantImportService
    {
        private readonly IRepository<eSuiteDbContext> _repository;        
        private PlantRow _plantRow;

        public PlantImportService(IRepository<eSuiteDbContext> repository)
        {
            _repository = repository;
        }

        public void Import(string filePath, string sheetName)
        {
            using(var stream = File.OpenRead(filePath))
            {
                var workbook = new XSSFWorkbook(stream);
                var sheet = workbook.GetSheet(sheetName);
                
                for(var i = 1; i < sheet.LastRowNum + 1; i++)
                {
                    var row = sheet.GetRow(i);
                    if(!isValidRow(row, i))
                    {
                        break;
                    }

                    var dbSector = _repository.FindBy<Sector>(s => s.Name == _plantRow.Sector)
                        .FirstOrDefault();
                    if(dbSector == null)
                    {
                        dbSector = new Sector
                        {
                            Name = _plantRow.Sector
                        };
                        _repository.Add(dbSector);
                        _repository.Save();
                    }

                    var dbBusinessUnit = _repository.FindBy<BusinessUnit>(bu => bu.Name == _plantRow.BusinessUnit 
                        && bu.SectorId == dbSector.Id)
                        .FirstOrDefault();
                    if(dbBusinessUnit == null)
                    {
                        dbBusinessUnit = new BusinessUnit
                        {
                            Name = _plantRow.BusinessUnit,
                            SectorId = dbSector.Id
                        };
                        _repository.Add(dbBusinessUnit);
                        _repository.Save();
                    }

                    var dbSOA = _repository.FindBy<SOA>(soa => soa.Name == _plantRow.SOA 
                        && soa.BusinessUnitId == dbBusinessUnit.Id )
                        .FirstOrDefault();
                    if(dbSOA == null)
                    {
                        dbSOA = new SOA
                        {
                            Name = _plantRow.SOA,
                            BusinessUnitId = dbBusinessUnit.Id
                        };
                        _repository.Add(dbSOA);
                        _repository.Save();
                    }

                    var dbDelegation = _repository.FindBy<Delegation>(d => d.Name == _plantRow.Delegation)
                        .FirstOrDefault();
                    if(dbDelegation == null)
                    {
                        dbDelegation = new Delegation
                        {
                            Name = _plantRow.Delegation
                        };
                        _repository.Add(dbDelegation);
                        _repository.Save();
                    }

                    var dbCountry = _repository.FindBy<Country>(c => c.Name == _plantRow.Country 
                        && c.DelegationId == dbDelegation.Id )
                        .FirstOrDefault();
                    if(dbCountry == null)
                    {
                        dbCountry = new Country
                        {
                            Name = _plantRow.Country,
                            DelegationId = dbDelegation.Id
                        };
                        _repository.Add(dbCountry);
                        _repository.Save();
                    }

                    var dbPlant = _repository.FindBy<Plant>(p => p.GaiaCode == _plantRow.GaiaCode)
                        .FirstOrDefault();
                    if(dbPlant == null)
                    {
                        dbPlant = new Plant
                        {
                            Name = _plantRow.PlantName,
                            GaiaCode = _plantRow.GaiaCode,
                            CountryId = dbCountry.Id,
                            SOAId = dbSOA.Id,
                        };
                        _repository.Add(dbPlant);                       
                    }
                    else
                    {
                        dbPlant.Name = _plantRow.PlantName;
                        dbPlant.SOAId = dbSOA.Id;
                        dbPlant.CountryId = dbCountry.Id;
                        _repository.Update(dbPlant);
                    }
                     _repository.Save();

                    System.Console.WriteLine($"Line {i} imported.");
                }
            }
        }

        private bool isValidRow(IRow row, int lineNumber)
        {
            _plantRow = null;
            var plantRow = new PlantRow(row);

            if(string.IsNullOrEmpty(plantRow.Sector))
            {
                System.Console.WriteLine($"Line {lineNumber}: sector is mandatory.");
                return false;
            }

            if(string.IsNullOrEmpty(plantRow.BusinessUnit))
            {
                System.Console.WriteLine($"Line {lineNumber}: business unit is mandatory.");
                return false;
            }

            if(string.IsNullOrEmpty(plantRow.SOA))
            {
                System.Console.WriteLine($"Line {lineNumber}: soa is mandatory.");
                return false;
            }

            if(string.IsNullOrEmpty(plantRow.Delegation))
            {
                System.Console.WriteLine($"Line {lineNumber}: delegation is mandatory.");
                return false;
            }

            if(string.IsNullOrEmpty(plantRow.Country))
            {
                System.Console.WriteLine($"Line {lineNumber}: country is mandatory.");
                return false;
            }

            if(string.IsNullOrEmpty(plantRow.GaiaCode))
            {
                System.Console.WriteLine($"Line {lineNumber}: gaia code is mandatory.");
                return false;
            }

            if(string.IsNullOrEmpty(plantRow.PlantName))
            {
                System.Console.WriteLine($"Line {lineNumber}: plant name is mandatory.");
                return false;
            }

            _plantRow = plantRow;
            return true;            
        }
    }
}