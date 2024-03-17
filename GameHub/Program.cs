using GameHub.Controllers;
using GameHub.Repositories;
//using.GameHub.SocketServer;

namespace GameHub
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<ILobbyRepository, LobbyRepository>();
            builder.Services.AddTransient<IMessageRepository, MessageRepository>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors("AllowAll");
                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();




            // //Socket Stuff here!

            Thread socketThread = new Thread(() => { 
            SocketServer server = new SocketServer();
                server.Start();
            });
            socketThread.Start();
           // SocketServer server = new SocketServer();
           // server.Start();

           // Keep the server running until a key is pressed
           //Console.WriteLine("Press any key to stop the server...");
           // Console.ReadKey();
           // server.Stop();


            app.Run();
        }
    }
}
