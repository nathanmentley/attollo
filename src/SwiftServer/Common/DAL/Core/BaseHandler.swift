import Foundation

public class BaseHandler {
    public var Database: DBContext

    public init(_ database: DBContext) {
        Database = database
    }
}