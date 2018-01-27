import uuid from 'uuid/v4';
import _ from 'lodash';

// this can be turned into a class structure later
// it works as separate functions for now

// interface Connection {
//   connection_id: string,
//   between: [string, string],
//   enabled: boolean
// }

let currentLevel = 0;

let ports = [];

let levelMaps = [];

// connections between ports are simply modeled as a two-way list
// we can jump between two ports if there exists a connection with the two
// ports contained in the between property, and the connection is enabled
let connections = [];

let currentNode;

export function setCurrentNode(node) {
  currentNode = node;
}

export function getCurrentNode(node) {
  return currentNode;
}

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

export function connectPorts(from, to, enabled = true) {
  // check that you cannot connect a port to itself
  if (from === to || _.isUndefined(from) || _.isUndefined(to)) {
    throw new Error('Cannot connect a port to itself or nothing');
  }

  // check if the port has been added to the ports list
  if (!_.includes(ports, from)) {
    ports.push(from);
  }

  if (!_.includes(ports, to)) {
    ports.push(to);
  }

  const already_connected = connections
    .filter(c => 
      _.includes(c.between, from) && 
      _.includes(c.between, to));

  if (!already_connected.length) {
    connections.push({
      connection_id: uuid(),
      between: [from, to],
      enabled
    });
  }
}

export function getPorts() {
  return ports;
}

export function getConnections() {
  return connections;
}

// TODO: implement Dijkstra's algorithm here to determine a path through
// which the player can jump (regardless if the nodes are adjacent)
export function canJumpBetween(source, destination) {
  if (source === destination || _.isUndefined(source) | _.isUndefined(destination)) {
    return false;
  }

  const [ connection ] = connections
    .filter(c => 
      _.includes(c.between, source) && 
      _.includes(c.between, destination));

  if (connection) {
    return connection.enabled;
  }

  return false;
}

export function resetState() {
  connections = [];
  ports = [];
  currentNode = undefined;
}

export function getCurrentLevel() {
  return currentLevel;
}

export function incrementLevel() {
  currentLevel++;
  resetState();
}

export const LEVEL_TYPE = {
  MAP: 'map',
  NETWORK: 'network'
}

export const LAYER_TYPE = {
  BACKGROUND: 'background',
  FLOOR: 'floor',
  COLLISION: 'collision',
  INTERACT: 'interact'
}

export function addLevelMap(map) {
  levelMaps.push(map);
}

export function loadAllLevelMaps(state) {
  for (let map of levelMaps) {
    map.load(state);
  }
}

export function getCurrentLevelMap(levelType) {
  switch (levelType) {
    case LEVEL_TYPE.MAP: {
      return levelMaps[currentLevel];
    }
  }
}