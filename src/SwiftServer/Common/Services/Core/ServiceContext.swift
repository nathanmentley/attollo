import Foundation

public class ServiceContext {
    public var Client: ClientHandler

    public init(_ database: DBContext) {
        Client = ClientHandler(database)
    }
}