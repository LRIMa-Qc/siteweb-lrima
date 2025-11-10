import type { ClientField, Field, Tab, TabAsFieldClient } from 'payload';
type Args = {
    field: ClientField | Field | Tab | TabAsFieldClient;
    index: number;
    parentIndexPath: string;
    parentPath: string;
    parentSchemaPath: string;
};
type FieldPaths = {
    /**
     * A string of '-' separated indexes representing where
     * to find this field in a given field schema array.
     * It will always be complete and accurate.
     */
    indexPath: string;
    /**
     * Path for this field relative to its position in the data.
     */
    path: string;
    /**
     * Path for this field relative to its position in the schema.
     */
    schemaPath: string;
};
export declare function getFieldPathsModified({ field, index, parentIndexPath, parentPath, parentSchemaPath, }: Args): FieldPaths;
export {};
//# sourceMappingURL=getFieldPathsModified.d.ts.map