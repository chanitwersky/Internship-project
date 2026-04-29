using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddOutputCache();

var app = builder.Build();

//app.Use(async (context, next) =>
//{
//    try
//    {
//        await next();
//    }
//    catch (Exception ex)
//    {
//        Console.WriteLine($"Exception caught in MW: {ex}");
//        await Results.Problem(title: "Internal server error", statusCode: 500).ExecuteAsync(context);
//    }
//});

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async (context) =>
    {
        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
        Console.WriteLine($"Exception caught in MW: {exception}");
        await Results.Problem(title: "Internal server error", statusCode: 500).ExecuteAsync(context);
    });
});
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();


app.Use(async (context, next) =>
{
    var startTime = DateTime.Now;
    await next();

    var endTime = DateTime.Now;
    var duration = endTime - startTime;
    var status = context.Response.StatusCode;

    Console.WriteLine($"{DateTime.UtcNow} [{context.Request.Method.PadRight(5)}] {context.Request.Path} - {status} ({duration})");
});

app.UseOutputCache();

app.Run();
