import Foundation

import Vapor
import VaporPostgreSQL

public class Attollo {
    public var Client: ClientService

    public init() throws {
        let drop = Droplet()
        try drop.addProvider(VaporPostgreSQL.Provider.self)

        let dbContext = try DBContext(drop.database!)
        let serviceContext = ServiceContext(dbContext)

        Client = ClientService(serviceContext)
    }
}