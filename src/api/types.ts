/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum ProductionOrderGroupingFilter {
  Executing = "Executing",
  Archived = "Archived",
}

/** Тип сортировки наряд-заданий */
export enum EProductionOrderOrderRule {
  StartDate = "StartDate",
  NormativeDate = "NormativeDate",
}

export enum EOrderByRule {
  Ascending = "Ascending",
  Descending = "Descending",
}

export enum EDocumentType {
  Act = "Act",
  Photo = "Photo",
  ProfilePhoto = "ProfilePhoto",
}

export enum EContractType {
  Income = "Income",
  Execution = "Execution",
}

export interface CharacteristicResponse {
  /** @format int32 */
  id?: number;
  name?: string | null;
}

export interface CommentRequest {
  comment?: string | null;
}

export interface CommentResponse {
  /** @format int32 */
  id?: number;
  text?: string | null;
  /** Облегченная модель исполнителя */
  author?: ExecutorLiteResponse | null;
  /** @format date-time */
  createdAt?: string;
}

export interface ContractListResponse {
  /** @format int32 */
  id?: number;
  name?: string | null;
  type?: EContractType;
}

export interface ContractListResponsePagedList {
  /** @format int32 */
  totalItems?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  /** @format int32 */
  nextPageNumber?: number;
  /** @format int32 */
  previousPageNumber?: number;
  items?: ContractListResponse[] | null;
}

export interface ContractResponse {
  /** @format int32 */
  id?: number;
  name?: string | null;
  type?: EContractType;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  endDate?: string;
}

export interface DocumentResponse {
  /** @format int32 */
  id?: number;
  name?: string | null;
  /** @format date-time */
  uploadingTime?: string;
  url?: string | null;
  /** Ответ API для исполнителя */
  author?: ExecutorResponse | null;
  type?: EDocumentType;
}

export interface ErrorApiResponse {
  error?: ErrorResponse | null;
}

export interface ErrorResponse {
  message?: string | null;
  text?: string | null;
  data?: Record<string, any>;
  requestId?: string | null;
}

/** Облегченная модель исполнителя */
export interface ExecutorLiteResponse {
  /**
   * ID
   * @format uuid
   */
  id?: string;
  /** ФИО */
  name?: string | null;
  /** Номер телефона */
  phoneNumber?: string | null;
}

/** Ответ API для исполнителя */
export interface ExecutorResponse {
  /**
   * ID
   * @format uuid
   */
  id?: string;
  /** ФИО */
  name?: string | null;
  /** Номер телефона */
  phoneNumber?: string | null;
  profilePhoto?: DocumentResponse | null;
}

/** Запрос на инициализацию телеграм пользователя */
export interface InitializeRequest {
  /** @minLength 1 */
  telegramUserInitData: string;
}

/** Ответ на инициализацию телеграм пользователя */
export interface InitializeResponse {
  /** JWT-токен, содержайщий !:CustomClaimTypes.TgUserId */
  token?: string | null;
}

/** Запрос на начало сессии исполнителя */
export interface LoginRequest {
  /**
   * Номер телефона исполнителя
   * @minLength 1
   */
  phoneNumber: string;
  /**
   * Фил исполнителя
   * @minLength 1
   */
  name: string;
}

/** Запрос на выход из сессии исполнителя */
export interface LogoutRequest {
  /**
   * JWT-токен
   * @minLength 1
   */
  token: string;
  /**
   * Рефреш-токен
   * @minLength 1
   */
  refreshToken: string;
}

/** Ответ API для списка номенклатур */
export interface NomenclatureListResponse {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Наименование */
  name?: string | null;
}

/** Ответ API для номенклатура */
export interface NomenclatureResponse {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Наименование */
  name?: string | null;
  /** Единицы измерения */
  units?: string | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

/** Облегченная модель наряд-заданий, используемая в списках */
export interface ProductionOrderListResponse {
  /**
   * Идентификатор
   * @format int32
   */
  id?: number;
  /** Номенклатура */
  nomenclature?: NomenclatureResponse | null;
  /**
   * Дата начала
   * @format date-time
   */
  startDate?: string;
  /**
   * Нормативная дата окончания
   * @format date-time
   */
  normativeCompletionDate?: string;
  /** Характеристика */
  characteristic?: CharacteristicResponse | null;
  /** Номер наряд-задания */
  requestNumber?: string | null;
  /**
   * Количество
   * @format double
   */
  amount?: number;
}

export interface ProductionOrderListResponsePagedList {
  /** @format int32 */
  totalItems?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  /** @format int32 */
  nextPageNumber?: number;
  /** @format int32 */
  previousPageNumber?: number;
  items?: ProductionOrderListResponse[] | null;
}

/** Ответ API для получения полной информации о наряд-задании */
export interface ProductionOrderResponse {
  documents?: DocumentResponse[] | null;
  /** Облегченная модель исполнителя */
  executor?: ExecutorLiteResponse | null;
  /** Ответ API для номенклатура */
  nomenclature?: NomenclatureResponse | null;
  characteristic?: CharacteristicResponse | null;
  comments?: CommentResponse[] | null;
  executionContract?: ContractResponse | null;
  contract?: ContractResponse | null;
  /** @format date-time */
  normativeCompletionDate?: string;
  /** @format date-time */
  startDate?: string;
  /** @format date-time */
  creationTime?: string;
  requestNumber?: string | null;
  /** @format double */
  amount?: number;
}

/** Ответ обновления JWT-токена */
export interface RefreshResponse {
  /** Новый JWT-токен */
  token?: string | null;
  /** Новый рефреш-токен */
  refreshToken?: string | null;
}

/** Запрос на обновление JWT-токена */
export interface RefreshTokenRequest {
  /**
   * Cтарый JWT-токен
   * @minLength 1
   */
  token: string;
  /**
   * Рефреш-токен
   * @minLength 1
   */
  refreshToken: string;
}

export interface StringPagedList {
  /** @format int32 */
  totalItems?: number;
  /** @format int32 */
  pageNumber?: number;
  /** @format int32 */
  pageSize?: number;
  /** @format int32 */
  totalPages?: number;
  hasPreviousPage?: boolean;
  hasNextPage?: boolean;
  /** @format int32 */
  nextPageNumber?: number;
  /** @format int32 */
  previousPageNumber?: number;
  items?: string[] | null;
}

/** Ответ на начало сесии исполнителя */
export interface TokenResponse {
  /** JWT-токен */
  token?: string | null;
  /** Ревреш-токен */
  refreshToken?: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Engineering Centre Bot Api
 * @version 1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthLoginCreate
     * @summary Начать сессию исполнителя
     * @request POST:/api/Auth/login
     * @secure
     */
    authLoginCreate: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<TokenResponse, ErrorApiResponse>({
        path: `/api/Auth/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthRefreshTokenCreate
     * @summary Обновить JWT-токен
     * @request POST:/api/Auth/refreshToken
     * @secure
     */
    authRefreshTokenCreate: (
      data: RefreshTokenRequest,
      params: RequestParams = {},
    ) =>
      this.request<RefreshResponse, ErrorApiResponse>({
        path: `/api/Auth/refreshToken`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthLogoutCreate
     * @summary Закончить сессию исполнителя
     * @request POST:/api/Auth/logout
     * @secure
     */
    authLogoutCreate: (data: LogoutRequest, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Auth/logout`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthInitializationCreate
     * @summary Инициализация и валидация Телеграм пользователя
     * @request POST:/api/Auth/initialization
     * @secure
     */
    authInitializationCreate: (
      data: InitializeRequest,
      params: RequestParams = {},
    ) =>
      this.request<InitializeResponse, ErrorApiResponse | ProblemDetails>({
        path: `/api/Auth/initialization`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contractors
     * @name ContractorsCustomersList
     * @summary Получить список заказчиков
     * @request GET:/api/Contractors/customers
     * @secure
     */
    contractorsCustomersList: (
      query?: {
        CustomerName?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<StringPagedList, ErrorApiResponse>({
        path: `/api/Contractors/customers`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contractors
     * @name ContractorsContractsList
     * @summary Получить список доходных договоров внутри контрагента
     * @request GET:/api/Contractors/contracts
     * @secure
     */
    contractorsContractsList: (
      query?: {
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContractListResponsePagedList, ErrorApiResponse>({
        path: `/api/Contractors/contracts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contractors
     * @name ContractorsExecutionContractsList
     * @summary Получить договоров с исполнителем внутри контрагента
     * @request GET:/api/Contractors/executionContracts
     * @secure
     */
    contractorsExecutionContractsList: (
      query?: {
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ContractListResponsePagedList, ErrorApiResponse>({
        path: `/api/Contractors/executionContracts`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Documents
     * @name DocumentsUploadCreate
     * @summary Загрузка документа
     * @request POST:/api/Documents/upload
     * @secure
     */
    documentsUploadCreate: (
      data: {
        /** @minItems 1 */
        file?: File[];
        /** @default "Act" */
        type?: EDocumentType;
      },
      params: RequestParams = {},
    ) =>
      this.request<DocumentResponse[], ErrorApiResponse>({
        path: `/api/Documents/upload`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Documents
     * @name DocumentsDetail
     * @summary Получение ссылки на документ
     * @request GET:/api/Documents/{documentId}
     * @secure
     */
    documentsDetail: (documentId: number, params: RequestParams = {}) =>
      this.request<string, ErrorApiResponse>({
        path: `/api/Documents/${documentId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Documents
     * @name DocumentsDelete
     * @summary Удаление документа
     * @request DELETE:/api/Documents/{documentId}
     * @secure
     */
    documentsDelete: (documentId: number, params: RequestParams = {}) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/Documents/${documentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Executors
     * @name ExecutorsExistingExecutorNamesList
     * @summary Возвращает список ФИО, похожих на набранный текст
     * @request GET:/api/Executors/existingExecutorNames
     * @deprecated
     * @secure
     */
    executorsExistingExecutorNamesList: (
      query?: {
        ExecutorName?: string;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<StringPagedList, ErrorApiResponse>({
        path: `/api/Executors/existingExecutorNames`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Executors
     * @name ExecutorsCurrentList
     * @request GET:/api/Executors/current
     * @secure
     */
    executorsCurrentList: (params: RequestParams = {}) =>
      this.request<ExecutorResponse, ErrorApiResponse>({
        path: `/api/Executors/current`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nomenclatures
     * @name NomenclaturesList
     * @summary Возвращает список номенклатур, присоединненых к исполнителю и похожих на набранный текст
     * @request GET:/api/Nomenclatures
     * @secure
     */
    nomenclaturesList: (
      query?: {
        NomenclatureName?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<NomenclatureListResponse[], ErrorApiResponse>({
        path: `/api/Nomenclatures`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Nomenclatures
     * @name NomenclaturesDetail
     * @summary Возвращает список характеристик указанной номенклатуры
     * @request GET:/api/Nomenclatures/{nomenclatureId}
     * @secure
     */
    nomenclaturesDetail: (nomenclatureId: number, params: RequestParams = {}) =>
      this.request<CharacteristicResponse[], ErrorApiResponse>({
        path: `/api/Nomenclatures/${nomenclatureId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrders
     * @name ProductionOrdersList
     * @summary Получить список наряд-заданий по фильтру
     * @request GET:/api/ProductionOrders
     * @secure
     */
    productionOrdersList: (
      query?: {
        /** @format int32 */
        NomenclatureId?: number;
        /** @format int32 */
        CharacteristicId?: number;
        GroupType?: ProductionOrderGroupingFilter;
        /** @format int32 */
        ContractId?: number;
        /** @format int32 */
        ExecutionContractId?: number;
        Customer?: string;
        /** Тип сортировки наряд-заданий */
        OrderRule?: EProductionOrderOrderRule;
        /** @format int32 */
        PageNumber?: number;
        /** @format int32 */
        PageSize?: number;
        OrderBy?: EOrderByRule;
      },
      params: RequestParams = {},
    ) =>
      this.request<ProductionOrderListResponsePagedList, ErrorApiResponse>({
        path: `/api/ProductionOrders`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrders
     * @name ProductionOrdersDetail
     * @summary Получить наряд-заданий по ID
     * @request GET:/api/ProductionOrders/{productionOrderId}
     * @secure
     */
    productionOrdersDetail: (
      productionOrderId: number,
      params: RequestParams = {},
    ) =>
      this.request<ProductionOrderResponse, ErrorApiResponse>({
        path: `/api/ProductionOrders/${productionOrderId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrders
     * @name ProductionOrdersCompleteCreate
     * @request POST:/api/ProductionOrders/{productionOrderId}/complete
     * @secure
     */
    productionOrdersCompleteCreate: (
      productionOrderId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ProductionOrders/${productionOrderId}/complete`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrders
     * @name ProductionOrdersDocumentsDelete
     * @summary Удалить прикрепленнуый документ
     * @request DELETE:/api/ProductionOrders/{productionOrderId}/documents/{documentId}
     * @secure
     */
    productionOrdersDocumentsDelete: (
      productionOrderId: number,
      documentId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ProductionOrders/${productionOrderId}/documents/${documentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrders
     * @name ProductionOrdersCommentsCreate
     * @summary Добавить комментарий
     * @request POST:/api/ProductionOrders/{productionOrderId}/comments
     * @secure
     */
    productionOrdersCommentsCreate: (
      productionOrderId: number,
      data: CommentRequest,
      params: RequestParams = {},
    ) =>
      this.request<CommentResponse, ErrorApiResponse>({
        path: `/api/ProductionOrders/${productionOrderId}/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ProductionOrders
     * @name ProductionOrdersCommentsDelete
     * @summary Удалить комментарий
     * @request DELETE:/api/ProductionOrders/{productionOrderId}/comments/{commentId}
     * @secure
     */
    productionOrdersCommentsDelete: (
      productionOrderId: number,
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, ErrorApiResponse>({
        path: `/api/ProductionOrders/${productionOrderId}/comments/${commentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
