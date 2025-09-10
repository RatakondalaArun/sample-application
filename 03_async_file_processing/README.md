Task 3: Async File Processing
Duration: 30–45 minutes
Objective
Create a service that processes multiple files asynchronously.
Requirements
Implement a class `FileService` with method:

```typescript
readFiles(paths: string[]): Promise<FileResult[]>
```

For each file:
1. Read file content.
2. Validate if it contains valid JSON.
3. Add a `processedAt` timestamp field.
4. Simulate 200–500 ms processing delay.
5. On invalid JSON, return an error.

- Interface:
```typescript
interface FileResult {
    path: string;
    success: boolean;
    data?: any;
    error?: string;
}
```

## Implementation

- `FileProcessingService#readFiles`
    - Checks if the file exists and accesable
    - Used `fs/promises` module to read file asynchronously
    - Validated file contents to be json with `JSON.parse`
    - Added `processedAt` to the processed json
    - Added approprate log messages
- Improvements
    - We can add additional improvements for large json file with json stream processing
    - There are several other libraries that provide faster and efficent json processing than standard `JSON.parse`

## Setup instructions

1) Install dependencies
```sh
pnpm i #used pnpm package manager
```
2) Execute script
```sh
pnpm run start
```
