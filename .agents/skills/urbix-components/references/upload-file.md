# UploadFile

Dropzone molecule for selecting files, showing upload status, and optionally queueing files for a manual start action.

## Status

- Scope: Public Component
- Lifecycle: incubator

## Imports

```tsx
import { UploadFile, formatUploadFileSize } from "@urbetrack/urbix";
import type {
  UploadFileItem,
  UploadFileProps,
  UploadFileStatus,
  UploadMode,
  UploadFileValidationError,
} from "@urbetrack/urbix";
```

Source-level import:

```tsx
import { UploadFile } from "@urbix/ui/molecules/upload-file";
```

## Usage

```tsx
const [files, setFiles] = useState<UploadFileItem[]>([]);

<UploadFile
  files={files}
  accept=".xls,.xlsx,.pdf,.jpg,.jpeg,.png"
  maxFiles={6}
  maxSizeBytes={16 * 1024 * 1024}
  onFilesSelect={(selectedFiles) => {
    setFiles(current => [
      ...current,
      ...selectedFiles.map((file, index) => ({
        id: `${file.name}-${file.lastModified}-${index}`,
        name: file.name,
        size: file.size,
        status: "loading" as const,
        progress: 0,
      })),
    ]);
  }}
  onRemoveFile={file => setFiles(current => current.filter(item => item.id !== file.id))}
/>;
```

## API

### UploadFile

| Prop | Type | Default | Description |
|---|---|---|---|
| `files` | `UploadFileItem[]` | `[]` | Controlled files rendered in the list. |
| `maxWidth` | `number \| string` | `614` | Maximum root width. Numbers become pixel values. |
| `fluid` | `boolean` | `true` | Fill available width up to `maxWidth`; when false, width equals `maxWidth`. |
| `accept` | `string` | -- | Accepted MIME types or extensions, same format as native file input. |
| `multiple` | `boolean` | `true` | Allows selecting more than one file. |
| `maxFiles` | `number` | -- | Maximum total files, counting controlled files and queued files in deferred mode. |
| `maxSizeBytes` | `number` | -- | Maximum size per file. |
| `uploadMode` | `"instant" \| "deferred"` | `"instant"` | Instant mode hands valid files to `onFilesSelect`; deferred mode queues them until start. |
| `disabled` | `boolean` | `false` | Disables selection, drag/drop, remove, retry, and start actions. |
| `instructions` | `string` | `"Arrastra aqui o"` | Text before the selectable label. |
| `selectLabel` | `string` | `"selecciona archivos."` | Highlighted selection label. |
| `description` | `string` | Format/size help text | Help text under the instructions. |
| `startUploadLabel` | `string` | `"Subir archivos"` | Start button label in deferred mode. |
| `showStartUploadButton` | `boolean` | `true` | Shows the default deferred start button. |
| `emptyStateLabel` | `string` | -- | Optional text shown when no files are displayed. |
| `validationErrorTitle` | `string` | `"Errores de carga"` | Error block title. |
| `removeLabel` | `(file) => string` | `Quitar {name}` | Accessible label factory for remove buttons. |
| `retryLabel` | `(file) => string` | `Reintentar {name}` | Accessible label factory for retry buttons. |
| `onFilesSelect` | `(files: File[]) => void` | -- | Instant-mode handoff for valid selected files. Does not fire in deferred mode. |
| `onQueuedFilesChange` | `(files: File[]) => void` | -- | Fires after deferred queue mutations only: enqueue, queued removal, and start-clear. |
| `onStartUpload` | `(files: File[]) => void` | -- | Deferred-mode handoff when queued files are started. |
| `onRemoveFile` | `(file: UploadFileItem) => void` | -- | Called for controlled files. Queued files are removed internally. |
| `onRetryFile` | `(file: UploadFileItem) => void` | -- | Called from retry buttons. |
| `onValidationError` | `(errors: UploadFileValidationError[]) => void` | -- | Called when selected files fail validation. |
| `inputProps` | Native file input props subset | -- | Advanced props for the internal file input; `type`, `accept`, `multiple`, `disabled`, and `onChange` are owned by UploadFile. |

```ts
type UploadFileItem = {
  id: string;
  name: string;
  size?: number | string;
  progress?: number;
  status?: "default" | "error" | "loading" | "success";
  removable?: boolean;
  retryable?: boolean;
  disabled?: boolean;
  source?: "uploaded" | "queued";
};
```

### UploadFileValidationError

Validation errors are emitted through `onValidationError`.

```ts
type UploadFileValidationError = {
  code: "invalid-type" | "max-files" | "max-size";
  fileName: string;
  message: string;
};
```

### formatUploadFileSize

```ts
function formatUploadFileSize(size?: number | string): string | undefined;
```

Formats byte counts into compact labels like `0 B`, `1.5KB`, or `16MB`. String values are returned unchanged, and invalid numeric values return `undefined`.

### Compound parts

`UploadFile` provides a shared context for these compound parts:

| Part | Props | Description |
|---|---|---|
| `UploadFile.Trigger` | `{ className?, instructions?, description?, selectLabel? }` | Select/drop trigger. Props override root text for this part. |
| `UploadFile.List` | `{ className? }` | Renders controlled and queued files. |
| `UploadFile.Errors` | `{ className?, title? }` | Renders validation errors. |
| `UploadFile.StartButton` | `{ className?, children? }` | Renders the deferred start action. |

## Patterns

### Deferred upload

Use deferred mode when users should review files before upload. Selected files are queued internally, `onQueuedFilesChange` reports queue mutations, and `onStartUpload` receives the files to upload.

```tsx
<UploadFile
  uploadMode="deferred"
  files={files}
  onQueuedFilesChange={queuedFiles => setQueuedCount(queuedFiles.length)}
  onStartUpload={(queuedFiles) => {
    setFiles(current => [
      ...current,
      ...queuedFiles.map(file => ({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        size: file.size,
        status: "loading" as const,
      })),
    ]);
  }}
>
  <UploadFile.Trigger />
  <UploadFile.Errors title="Archivos rechazados" />
  <UploadFile.List />
  <UploadFile.StartButton>Subir ahora</UploadFile.StartButton>
</UploadFile>
```

### Forms integration

Use `Forms.UploadFile` when the selected files belong to React Hook Form state. In deferred mode, queued files are not written to the form value until the upload is started.

## Mistakes

- **Using `onFilesSelect` for deferred uploads.** In deferred mode, use `onStartUpload`; `onFilesSelect` is instant-only.
- **Expecting UploadFile to send files to a backend.** It validates, queues, and renders file state; application code owns the actual upload request.
- **Expecting `onQueuedFilesChange` to initialize state on mount.** It fires only after queue mutations.
- **Treating queued files as uploaded files.** Queued files disappear when the queue is started unless the consumer adds them back through the controlled `files` prop.

## Related references

- [forms.md](./forms.md) — `Forms.UploadFile` integrates this molecule with React Hook Form.
- [button.md](./button.md) — command button conventions used by the start action.

## Source files

- `packages/urbix/src/ui/molecules/upload-file/upload-file.tsx`
- `packages/urbix/src/ui/molecules/upload-file/types.ts`
- `packages/urbix/src/ui/molecules/upload-file/hooks/use-upload-file-controller.ts`
- `packages/urbix/src/ui/molecules/upload-file/status.json`
- `packages/urbix/src/ui/molecules/upload-file/upload-file.stories.tsx`
