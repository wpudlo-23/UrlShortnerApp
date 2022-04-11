using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Data;

namespace Api.Controllers;

[ApiController]
[Route("api/v1/url-shortner")]
public class UrlShortnerController : ControllerBase
{
    private readonly ShortenedUrlDbContext _shortenedUrlDbContext;
    private readonly ILogger<UrlShortnerController> _logger;

    public UrlShortnerController(ShortenedUrlDbContext shortenedUrlDbContext, ILogger<UrlShortnerController> logger)
    {
        _shortenedUrlDbContext = shortenedUrlDbContext;
        _logger = logger;
    }

    [HttpGet("get-all")]
    public IEnumerable<ShortenedUrl> Get()
    {
        return _shortenedUrlDbContext.ShortenedUrls;
    }

    [HttpGet("get-slug-url/{urlSlug}")]
    public ShortenedUrl GetUrlBySlug(string urlSlug)
    {
        return _shortenedUrlDbContext.ShortenedUrls.Where(w => w.Url_Slug == urlSlug).FirstOrDefault();
    }

    [HttpPost("create-url")]
    public async Task<ShortenedUrl> CreateShortenedUrl(ShortenedUrl url)
    {
        // check if url valid
        Uri uriResult;
        bool result = Uri.TryCreate(url.Url, UriKind.Absolute, out uriResult)
            && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

        if (result)
        {
            // check if url exists
            bool urlExists = _shortenedUrlDbContext.ShortenedUrls.Any(a => a.Url == url.Url);
            if(urlExists)
            {
                return _shortenedUrlDbContext.ShortenedUrls.Where(w => w.Url == url.Url).FirstOrDefault();
            }

            // generate url alias
            var chars = "abcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[6];
            var random = new Random();

            string finalString = "";
            bool isAliasGood = false;
            while (!isAliasGood)
            {
                for (int i = 0; i < stringChars.Length; i++)
                {
                    stringChars[i] = chars[random.Next(chars.Length)];
                }

                finalString = new String(stringChars);

                bool isFinalStringBad = _shortenedUrlDbContext.ShortenedUrls.Any(a => a.Url_Slug == finalString);
                if (!isFinalStringBad)
                    isAliasGood = true;
            }

            url.Date = DateTime.Today.ToShortDateString();
            url.Url_Slug = finalString;

            _shortenedUrlDbContext.Add(url);
            await _shortenedUrlDbContext.SaveChangesAsync();

            return url;
        }

        ShortenedUrl invalid_url = new ShortenedUrl(true);

        return invalid_url;
    }

    [HttpDelete("delete-urls")]
    public void DeleteUrls()
    {
        _shortenedUrlDbContext.Database.ExecuteSqlRaw("TRUNCATE TABLE dbo.ShortenedUrls");
    }
}
