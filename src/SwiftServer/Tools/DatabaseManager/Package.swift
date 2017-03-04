import PackageDescription

let package = Package(
    name: "DatabaseManager",
    dependencies: [
        .Package(url: "https://github.com/vapor/vapor.git", majorVersion: 1, minor: 5),
        .Package(url: "https://github.com/vapor/postgresql-provider.git", "1.1.1")
    ],
    exclude: [
        "Config"
    ]
)

