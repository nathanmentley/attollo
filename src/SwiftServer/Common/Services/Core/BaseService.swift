import Foundation

public class BaseService {
    public var Context: ServiceContext
    public init(_ context: ServiceContext) {
        Context = context
    }
}