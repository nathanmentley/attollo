import Foundation

public class ClientService: BaseService {
    override public init(_ context: ServiceContext) {
        super.init(context)
    }

    public func GetClient(_ id: Int) throws -> Client? {
        return try Context.Client.GetClient(id);
    }
}