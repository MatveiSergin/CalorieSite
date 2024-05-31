class BaseException(Exception):
    pass


class SerializerException(BaseException):
    pass

class ApiException(BaseException):
    pass

class NotConvertToJsonException(BaseException):
    pass