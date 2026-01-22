export const env = {
    mongo: 'mongodb://localhost:27017/agrisys?authSource=admin',
    // mongo: 'mongodb://radz:radz@192.168.3.250:27017/agri?authSource=admin',
    // city_db_uri : 'mongodb://192.168.3.253/city_database',
    // authUrl: "https://192.168.3.253/oneauth/api",
    service_id: 36,
    service_key: 'OyTIoAEPhibFXqgG',
    upload_url: 'https://lgubislig.app/signed-url/api',
    upload_api_key: 'FF7CAEDABB85E5FBADCCB7A25690'
};

export const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};