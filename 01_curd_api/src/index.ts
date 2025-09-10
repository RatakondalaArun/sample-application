import express from 'express';
import joi from 'joi';

type Note = {
  id: string;
  title: string;
  note: string;
};

let notesDB: Note[] = [
  {
    id: '0',
    title: 'Title 1',
    note: 'note 1',
  },
];

function startServer() {
  const app = express();
  app.use(middleWareLogger); // logging middleware
  app.use(express.json()); // to parse JSON bodies
  setupRoutes(app);
  app.use(errorHandlingMiddleware); // placing this at the end to catch all errors

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

const middleWareLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
};

const errorHandlingMiddleware = (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  sendErrorMessage(res);
};

startServer();

function setupRoutes(app: express.Application) {
  // a. `POST /notes` – Create a note
  // b. `GET /notes` – List all notes
  // c. `GET /notes/:id` – Fetch by ID
  // d. `PUT /notes/:id` – Update note
  // e. `DELETE /notes/:id` – Delete note

  app.get('/ping', (req, res, next) => {
    res.send('Hello World');
  });

  app.post('/notes', (req, res, next) => {
    try {
      const noteBody: string = req.body;

      // todo: add validation
      const validation = joi
        .object({
          title: joi.string().required(),
          note: joi.string().required(),
        })
        .validate(noteBody);

      if (validation.error) {
        res.status(400).send({ message: validation.error.message });
        return;
      }

      const newNote: Note = {
        id: (notesDB.length + 1).toString(),
        title: validation.value.title,
        note: validation.value.note,
      };

      notesDB.push(newNote);

      res.status(200).send(newNote);
    } catch (error) {
      next(error);
    }
  });

  app.get('/notes', (req, res, next) => {
    res.status(200).send(notesDB);
  });

  app.get('/notes/:noteId', (req, res, next) => {
    try {
      const noteId: string = req.params['noteId'];

      // todo: add validation
      const validation = joi.string().required().validate(noteId);
      if (validation.error) {
        res.status(400).send({ message: validation.error.message });
        return;
      }

      const note = notesDB.find((note) => note.id === noteId);

      if (!note) {
        res.status(404).send({
          message: `Note with id ${noteId} not found`,
        });
      }

      res.status(200).send(note);
    } catch (error) {
      next(error);
    }
  });

  app.put('/notes/:noteId', (req, res, next) => {
    try {
      console.log('Updating note...');
      const noteId: string = req.params['noteId'];
      const noteBody: string = req.body;

      const idValidation = joi.string().required().validate(noteId);
      if (idValidation.error) {
        res.status(400).send({ message: idValidation.error.message });
        return;
      }

      const findNote = notesDB.find((note) => note.id === noteId);
      if (!findNote) {
        res.status(404).send({
          message: `Note with id ${noteId} not found`,
        });
        return;
      }

      const bodyValidation = joi
        .object({
          title: joi.string().required(),
          note: joi.string().required(),
        })
        .validate(noteBody);
      if (bodyValidation.error) {
        res.status(400).send({ message: bodyValidation.error.message });
        return;
      }

      const updatedNote: Note = {
        id: noteId,
        title: bodyValidation.value.title ?? findNote.title, // should not remove existing file data
        note: bodyValidation.value.note ?? findNote.note,
      };

      const noteIndex = notesDB.findIndex((note) => note.id === noteId);
      notesDB[noteIndex] = updatedNote;
      res.status(200).send(updatedNote);
    } catch (error) {
      next(error);
    }
  });

  app.delete('/notes/:noteId', (req, res, next) => {
    try {
      const noteId: string = req.params['noteId'];

      // todo: add validation
      const validation = joi.string().required().validate(noteId);
      if (validation.error) {
        res.status(400).send({ message: validation.error.message });
        return;
      }

      notesDB = [...notesDB.filter((note) => note.id !== noteId)] as Note[];

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });
}

function sendErrorMessage(res: express.Response, msg: string = 'Internal server error') {
  res.status(500).send({
    message: msg,
  });
}
