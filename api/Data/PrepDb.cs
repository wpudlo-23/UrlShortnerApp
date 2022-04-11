using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public static class PrepDB
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using(var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<ShortenedUrlDbContext>());
            }
        }

        public static void SeedData(ShortenedUrlDbContext context)
        {
            context.Database.Migrate();
        }
    }
}