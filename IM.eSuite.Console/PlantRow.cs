using NPOI.SS.UserModel;

namespace IM.eSuite.Console
{    
    public class PlantRow
    {
        public string Sector { get; private set; }
        public string BusinessUnit { get; private set; }
        public string SOA { get; private set; }
        public string Delegation { get; private set; }
        public string Country { get; private set; }
        public string GaiaCode { get; private set; }
        public string PlantName { get; private set; }

        public PlantRow(IRow row)
        {
            Sector = row.GetCell(0)?.StringCellValue;
            BusinessUnit = row.GetCell(1)?.StringCellValue;
            SOA = row.GetCell(2)?.StringCellValue;
            Delegation = row.GetCell(3)?.StringCellValue;
            Country = row.GetCell(4)?.StringCellValue;
            GaiaCode = row.GetCell(5)?.StringCellValue;
            PlantName = row.GetCell(6)?.StringCellValue;
        }
    }
}