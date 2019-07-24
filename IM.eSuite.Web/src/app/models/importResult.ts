import { ImportError } from "./importError";

export class ImportResult {
    imported: number;
    errors: Array<ImportError>;
}