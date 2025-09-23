type ModelNoSqlColumn<Row, Value> =
	ModelNoSqlColumnInteger |
	ModelNoSqlColumnString |
	ModelNoSqlColumnObject<Value> |
	ModelNoSqlColumnDateTime

type ModelNoSqlColumnInteger = {
	type: 'INTEGER',
	defaultValue?: number | null,
}

type ModelNoSqlColumnString = {
	type: 'STRING',
	defaultValue?: string | null,
}

type ModelNoSqlColumnDateTime = {
	type: 'DATETIME',
	defaultValue?: Date | 'CURRENT_TIMESTAMP' | null,
}

type ModelNoSqlColumnObject<Value> = {
	type: 'OBJECT',
	defaultValue?: Value | null,
}

type ModelSqlColumnInteger = {
	allowNull?: boolean
	type: 'INTEGER'
	options?: {
		length: number
	}
	defaultValue?: number | null
}

type ModelSqlColumnBigint = {
	allowNull?: boolean
	type: 'BIGINT'
	options?: {
		length: number
	}
	defaultValue?: number | null
}

type ModelSqlColumnFloat = {
	allowNull?: boolean
	type: 'FLOAT'
	options?: {
		length: number
	}
	defaultValue?: number | null
}

type ModelSqlColumnBoolean = {
	allowNull?: boolean
	type: 'BOOLEAN'
	options?: {}
	defaultValue?: boolean | null
}

type ModelSqlColumnString = {
	allowNull?: boolean
	type: 'STRING',
	options?: {
		length: number
	}
	defaultValue?: string | null
}

type ModelSqlColumnText = {
	allowNull?: boolean
	type: 'TEXT',
	options?: {
		length: 'tiny' | 'medium' | 'long'
	}
	defaultValue?: string
}

type ModelSqlColumnDateTime = {
	type: 'DATETIME',
	defaultValue?: Date | 'CURRENT_TIMESTAMP' | null
	allowNull?: boolean,
}

type ModelSqlColumnJson<Value> = {
	type: 'JSON',
	defaultValue?: Value | null
	allowNull?: boolean,
}


type ModelSqlColumn<Row, Value> =
	ModelSqlColumnInteger |
	ModelSqlColumnBigint |
	ModelSqlColumnFloat |
	ModelSqlColumnBoolean |
	ModelSqlColumnString |
	ModelSqlColumnJson<Value> |
	ModelSqlColumnText |
	ModelSqlColumnDateTime

type ModelSqlColumns<
	Row extends object,
	RowPrimaryKey extends string = 'id',
	RowDateAddKey extends (string | null) = 'date_add',
	RowDateUpdateKey extends (string | null) = 'date_update'
> = {
	[K in keyof Row]: ModelSqlColumn<Row, Row[K]>;
	
};


type ModelNoSqlColumns<
	Row extends object
> = {
	[K in keyof Row]: ModelNoSqlColumn<Row, Row[K]>;
};


export type GmModelSqlColumn = ModelSqlColumn<any, any>
export type GmModelNoSqlColumn = ModelNoSqlColumn<any, any>

