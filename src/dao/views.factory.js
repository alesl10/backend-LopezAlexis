import persistence from '../config/app.config.js';
import environment from '../../db/db.js';

let viewsDao;

switch (persistence) {
	case 'memory':
		const { default: MemoryDAO } = await import('./memory/views.memory.js');
		viewsDao = MemoryDAO;
		break;
	case 'mongo':
		environment();
		const { default: MongoDAO } = await import('./mongo/views.mongo.js');
		viewsDao = MongoDAO;
		break;
}

export default viewsDao;
