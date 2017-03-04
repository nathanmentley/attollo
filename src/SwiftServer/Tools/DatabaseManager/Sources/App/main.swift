import Foundation

do {
    var attollo = try Attollo()

    print("database manager start")

    print(try attollo.Client.GetClient(1)?.data["name"])

    print("database manager end")
} catch {
    print("Error info: \(error)")
}