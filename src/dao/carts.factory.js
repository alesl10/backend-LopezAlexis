import persistence from '../config/app.config.js';
import environment from '../../db/db.js';

let cartsDAO;

switch (persistence) {
	case 'memory':
		const { default: MemoryDAO } = await import('./memory/carts.memory.js');
		cartsDAO = MemoryDAO;
		break;
	case 'mongo':
		environment();
		const { default: MongoDAO } = await import('./mongo/carts.mongo.js');
		cartsDAO = MongoDAO;
		break;
}

export default cartsDAO;
