using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class ShortenedUrlDbContext : DbContext
    {
        public ShortenedUrlDbContext(DbContextOptions<ShortenedUrlDbContext> options) 
            : base(options)
        {

        }

        public DbSet<ShortenedUrl> ShortenedUrls { get; set; }
    }
}