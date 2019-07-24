using IM.eSuite.Domain;

namespace IM.eSuite.API.Dto
{
    public class ListRequestDto
    {
        /// <value>Page number</value>
        public int? PageNumber { get; set; }

        /// <value>Page size</value>
        public int? PageSize { get; set; }

        /// <value>Property to sort on</value>
        public string SortBy { get; set; }

        ///<value>Indicates if sort is descending or ascending</value>
        public bool IsDescending { get; set; }        
    }
}