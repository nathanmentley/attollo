import Fluent

public class Client: BaseEntity {
    public static var entity: String { return "client" }
    public static var name: String { get { return "client" } }

    public var id: Node?
    public var exists: Bool = false

    public static var columns: [String] {
        return [
            "id",
            "name"
        ]
    }

    public var name: String {
        set { data["name"] = Node(newValue) }
        get { return data["name"]?.string ?? "" }
    }
    public var auid: Int {
        set { data["id"] = Node(newValue) }
        get { return data["id"]?.int ?? 0 }
    }

    public var data: [String: Node?]

    public init() {
        data = [String: Node?]()
    }

    public init(_ props: [String: Node?]) {
        data = props
    }

    public required init(serialized: [String: Node]) {
        data = [String: Node?]()

        for column in Client.columns {
            data[column] = serialized[column]
        }
    }

    public required init(node: Node, in context: Context) throws {
        data = [String: Node]()

        for column in Client.columns {
            if let try value = node.extract(column) {
                data[column] = value
            }
        }
    }

    public func serialize() -> [String: Node?] {
        var ret = [String: Node?]()

        for (name, value) in data {
            ret[name] = value
        }

        return ret
    }

    public static func prepare(_ database: Database) throws {
        try database.create(entity) { builder in
            builder.id()

            for column in columns {
                builder.string(column)
            }
        }
    }

    public static func revert(_ database: Database) throws {
        try database.delete(entity)
    }

    public func makeNode(context: Context) throws -> Node {
        return try Node(node: data)
    }
}