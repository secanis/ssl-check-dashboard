const result = await fetch(`http://localhost:${process.env.PORT}/api/health`);
if (result.status === 200) {
    console.log('Server is healthy');
} else {
    console.log('Server is not healthy');
    process.exit(1);
}
