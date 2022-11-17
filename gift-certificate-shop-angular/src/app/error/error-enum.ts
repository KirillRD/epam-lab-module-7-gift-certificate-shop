export class ErrorEnum {
  public static readonly GENERAL = new ErrorEnum("GENERAL", 500_000);

  public static readonly PARSE_FORMAT = new ErrorEnum("PARSE_FORMAT", 400_000);
  public static readonly PAGE_FORMAT = new ErrorEnum("PAGE_FORMAT", 400_001);
  public static readonly NOT_FOUND_ENTITY_BY_ID = new ErrorEnum("NOT_FOUND_ENTITY_BY_ID", 400_002);
  public static readonly NOT_FOUND_ENTITY_BY_NAME = new ErrorEnum("NOT_FOUND_ENTITY_BY_NAME", 400_003);
  public static readonly NOT_FOUND_USER = new ErrorEnum("NOT_FOUND_USER", 400_005);
  public static readonly TAG_FORMAT = new ErrorEnum("TAG_FORMAT", 400_005);
  public static readonly EXISTING_LINK = new ErrorEnum("EXISTING_LINK", 400_006);

  public static readonly UNAUTHENTICATED = new ErrorEnum("UNAUTHENTICATED", 401_001);

  public static readonly LOGIN = new ErrorEnum("LOGIN", 403_001);
  public static readonly UNAUTHORIZED = new ErrorEnum("UNAUTHORIZED", 403_002);

  public static readonly NOT_FOUND = new ErrorEnum("NOT_FOUND", 404_000);

  public static readonly DUPLICATE = new ErrorEnum("DUPLICATE", 409_000);

  public static readonly VALIDATION_BLANK = new ErrorEnum("VALIDATION_BLANK", 422_001);
  public static readonly VALIDATION_PRICE = new ErrorEnum("VALIDATION_PRICE", 422_002);
  public static readonly VALIDATION_ORDER_PRICE = new ErrorEnum("VALIDATION_ORDER_PRICE", 422_003);
  public static readonly VALIDATION_DIGITS_MIN = new ErrorEnum("VALIDATION_DIGITS_MIN", 422_004);
  public static readonly VALIDATION_MIN = new ErrorEnum("VALIDATION_MIN", 422_005);
  public static readonly VALIDATION_SIZE = new ErrorEnum("VALIDATION_SIZE", 422_006);
  public static readonly VALIDATION_EMAIL = new ErrorEnum("VALIDATION_EMAIL", 422_007);
  public static readonly VALIDATION_PHONE = new ErrorEnum("VALIDATION_PHONE", 422_008);
  public static readonly BLANK_PASSWORD = new ErrorEnum("BLANK_PASSWORD", 422_009);

  public readonly name: string;
  public readonly code: number;

  private constructor(name: string, code: number) {
      this.name = name;
      this.code = code;
  }

  public static get values(): Array<ErrorEnum> {
      return Object.values(ErrorEnum);
  }

  public static containsByName(name: string): boolean {
    return ErrorEnum.values.some(error => error.name == name);
  }

  public static containsByCode(code: number): boolean {
    return ErrorEnum.values.some(error => error.code == code);
  }

  public static findByName(name: string): ErrorEnum | undefined {
    return ErrorEnum.values.find(error => error.name == name);
  }

  public static findByCode(code: number): ErrorEnum | undefined {
    return ErrorEnum.values.find(error => error.code == code);
  }
}
