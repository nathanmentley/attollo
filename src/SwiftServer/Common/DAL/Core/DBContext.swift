import Foundation

import Vapor
import Fluent

public class DBContext {
    public var Clients : Query<Client>

    public init(_ database: Database) throws {
        Client.database = database
        try Clients = Client.query()
    }
}