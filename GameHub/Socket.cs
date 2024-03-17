using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace GameHub
{



    public class SocketServer
    {
        private const int PORT = 8888;
        private readonly TcpListener listener;
        private bool isRunning;

        public SocketServer()
        {
            listener = new TcpListener(IPAddress.Any, PORT);
        }

        public void Start()
        {
            isRunning = true;
            listener.Start();
            Console.WriteLine("Socket server started on port " + PORT);

            // Start a new thread to handle incoming connections
            Thread listenThread = new Thread(ListenForClients);
            listenThread.Start();
        }

        public void Stop()
        {
            isRunning = false;
            listener.Stop();
            Console.WriteLine("Socket server stopped");
        }

        private void ListenForClients()
        {
            while (isRunning)
            {
                // Accept incoming client connections
                TcpClient client = listener.AcceptTcpClient();
                Console.WriteLine("Client connected: " + client.Client.RemoteEndPoint);

                // Start a new thread to handle communication with the client
                Thread clientThread = new Thread(HandleClient);
                clientThread.Start(client);
            }
        }

        private void HandleClient(object clientObj)
        {
            TcpClient client = (TcpClient)clientObj;
            NetworkStream stream = client.GetStream();

            byte[] buffer = new byte[1024];
            int bytesRead;
            Console.WriteLine("Handling client Beep Boop");
            while ((bytesRead = stream.Read(buffer, 0, buffer.Length)) > 0)
            {
                // Handle received data (e.g., parse JSON, process commands, etc.)
                string data = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                Console.WriteLine("Received data from client: " + data);

                // Echo back the received data to the client
                byte[] response = Encoding.UTF8.GetBytes("Server received: " + data);
                stream.Write(response, 0, response.Length);
            }

            // Close the client connection
            stream.Close();
            client.Close();
            if (client.Client != null) {
                Console.WriteLine("Client disconnected: " + client.Client.RemoteEndPoint);
            }
        }
    }

    // Example usage
    //class Program
    //{
    //    static void Main(string[] args)
    //    {
    //        SocketServer server = new SocketServer();
    //        server.Start();

    //        // Keep the server running until a key is pressed
    //        Console.WriteLine("Press any key to stop the server...");
    //        Console.ReadKey();
    //        server.Stop();
    //    }
    //}
}