using System.ComponentModel.DataAnnotations;

namespace Api.Data
{
    public class ShortenedUrl
    {
        public ShortenedUrl()
        {

        }

        public ShortenedUrl(bool isUrlInvalid)
        {
            Is_Url_Invalid = isUrlInvalid;
        }

        public int Id { get; set; }

        [StringLength(5000)]
        public string Url { get; set; }

        [StringLength(2000)]
        public string Base_Url { get; set; }

        [StringLength(6)]
        public string Url_Slug { get; set; }

        public string Date { get; set; }

        public string Url_And_Slug
        {
            get
            {
                return string.Format("{0}/{1}", Base_Url, Url_Slug);
            }
        }

        public bool Is_Url_Invalid { get; }
    }
}