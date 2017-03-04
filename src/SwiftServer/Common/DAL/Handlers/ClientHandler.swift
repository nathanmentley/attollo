import Foundation

public class ClientHandler: BaseHandler {
    override public init(_ database: DBContext) {
        super.init(database)
    }

    public func GetClient(_ id: Int) throws -> Client? {
        return try Database.Clients.filter("id", id).first()
    }
}