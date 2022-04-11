using Api.Data;
using Microsoft.EntityFrameworkCore;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000").WithOrigins("https://localhost:3000");
            policy.AllowAnyMethod();
            policy.AllowAnyHeader();
        });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// add SQL server
var server = builder.Configuration["DBServer"];
var port = builder.Configuration["DBPort"];
var user = builder.Configuration["DBUser"];
var password = builder.Configuration["DBPassword"];
var database = builder.Configuration["Database"];

builder.Services.AddDbContext<ShortenedUrlDbContext>(
    options => options.UseSqlServer($"Server={server},{port};Initial Catalog={database};User ID={user};Password={password}")
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllers();

// Initialize database schema off transformations
PrepDB.PrepPopulation(app);

app.Run();
