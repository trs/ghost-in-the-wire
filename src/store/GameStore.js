import uuid from 'uuid/v4';

// this can be turned into a class structure later
// it works as separate functions for now

// interface Connection {
//   connection_id: string,
//   between: [string, string],
//   enabled: boolean
// }

// connections between ports are simply modeled as a two-way list
// we can jump between two ports if there exists a connection with the two
// ports contained in the between property, and the connection is enabled
let connections = [];

// switches are associated with a connection_id, so when a switch is toggled, that connection
// is enabled/disabled
export function getSwitchState(connection_id) {
  const [ connection ] = connections.filter(c => c.connection_id === connection_id);
  return connection ? connection.enabled : undefined;
}

export function toggleSwitchState(connection_id) {
  const [ connection ] = connections.filter(c => c.connection_id === connection_id);
  connection.enabled = !connection.enabled;
}

function doesContain(connection, port) {
  return connection.between.indexOf(port) > 0;
}

export function connectPorts(from, to, enabled = true) {
  const already_connected = connections
    .filter(c => doesContain(c, from) && doesContain(c, to));

  if (!already_connected.length) {
    connections.push({
      connection_id: uuid(),
      between: [from, to],
      enabled
    });
  }
}

export function getConnections() {
  return connections;
}

export function canJumpBetween(source, destination) {
  const [ connection ] = connections
    .filter(c => doesContain(c, from) && doesContain(c, to));

  if (connection) {
    return connection.enabled;
  }

  return false;
}