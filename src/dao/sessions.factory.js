import persistence from '../config/app.config.js';
import environment from '../../db/db.js';

let sessionsDAO;

switch (persistence) {
	case 'memory':
		const { default: MemoryDAO } = await import('./memory/sessions.memory.js');
		sessionsDAO = MemoryDAO;
		break;
	case 'mongo':
		environment();
		const { default: MongoDAO } = await import('./mongo/sessions.mongo.js');
		sessionsDAO = MongoDAO;
		break;
}

export default sessionsDAO;
