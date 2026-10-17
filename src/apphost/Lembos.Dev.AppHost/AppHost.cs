var builder = DistributedApplication.CreateBuilder(args);

// The site is a static export published to GitHub Pages, so the AppHost exists only for
// local development: the Next dev server, with hot reload for the pages and the docs.
builder.AddJavaScriptApp("frontend", "../../frontend")
    .WithPnpm()
    .WithHttpEndpoint(env: "PORT")
    .WithUrlForEndpoint("http", static url => url.DisplayText = "lembos.dev (Local)")
    .WithExternalHttpEndpoints();

builder.Build().Run();
