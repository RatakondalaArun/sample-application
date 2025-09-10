import * as fs from 'fs/promises';
import * as fspath from 'path';

interface FileResult {
  path: string;
  success: boolean;
  data?: any;
  error?: string;
}

class FileProcessingService {
  // read file content - fs
  // validate if it contains valid JSON - can use JSON.parse, shoulrd return error if invalid
  // Add a `processedAt` timestamp field. - assuming this is supposed to be added to the JSON file object
  //
  async readFiles(path: string[]): Promise<FileResult[]> {
    try {
      const results: FileResult[] = [];
      for (const p of path) {
        const absPath = fspath.join(__dirname, '..', '..', p);
        console.log('Reading file:', absPath);
        // validate if file exists
        if (!(await this.doesFileExist(absPath))) {
          // should skip other files so it is not blocking
          console.log(`File does not exist: ${absPath}. Skipping...`);
          continue;
        }
        results.push(await this.validateAndProcess(absPath));
      }
      return results;
    } catch (error) {
      console.error('Error reading files:', error);
      throw error;
    }
  }

  /**
   * Check if file exists
   * @param filePath
   * @returns
   */
  async doesFileExist(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch (error) {
      console.error('Error accessing file:', error);
      return false;
    }
  }

  /**
   * Validate and process file
   * @param filePath
   * @returns
   */
  async validateAndProcess(filePath: string): Promise<FileResult> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      let data = null;
      try {
        data = JSON.parse(content);
      } catch (error) {
        console.log('Skipping file (failed validation):', filePath);
        return {
          path: filePath,
          success: false,
          error: 'Invalid JSON',
        };
      }
      data.processedAt = new Date().toISOString();
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
      console.log('Processed file:', filePath);
      return {
        path: filePath,
        success: true,
        data: data,
      };
    } catch (error) {
      console.error('Error processing file:', error);
      return {
        path: filePath,
        success: false,
        error: 'Error processing file',
      };
    }
  }
}

async function test() {
  console.log(
    await new FileProcessingService().readFiles([
      '03_async_file_processing/sample.json',
      '03_async_file_processing/sample_err_case.json',
    ])
  );
}

test();
