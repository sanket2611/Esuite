using System.Collections.Generic;

namespace IM.eSuite.Service
{
    public class ImportResult
    {
        public int Imported { get;set; }
        public IList<KeyValuePair<int, string>> Errors {get; set;}        

        public ImportResult()
        {
            Errors = new List<KeyValuePair<int, string>>();
        }
    }
}