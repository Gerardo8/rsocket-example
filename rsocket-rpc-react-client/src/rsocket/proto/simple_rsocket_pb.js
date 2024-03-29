// GENERATED CODE -- DO NOT EDIT!

'use strict';
var rsocket_rpc_frames = require('rsocket-rpc-frames');
var rsocket_rpc_core = require('rsocket-rpc-core');
var rsocket_rpc_tracing = require('rsocket-rpc-tracing');
var rsocket_rpc_metrics = require('rsocket-rpc-metrics').Metrics;
var rsocket_flowable = require('rsocket-flowable');
var simple_pb = require('./simple_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

var SimpleServiceClient = function () {
  function SimpleServiceClient(rs, tracer, meterRegistry) {
    this._rs = rs;
    this._tracer = tracer;
    this.requestReplyTrace = rsocket_rpc_tracing.traceSingle(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "requestReply"}, {"rsocket.rpc.role": "client"});
    this.requestReplyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "requestReply"}, {"role": "client"});
    this.fireAndForgetTrace = rsocket_rpc_tracing.traceSingle(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "fireAndForget"}, {"rsocket.rpc.role": "client"});
    this.fireAndForgetMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "fireAndForget"}, {"role": "client"});
    this.requestStreamTrace = rsocket_rpc_tracing.trace(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "requestStream"}, {"rsocket.rpc.role": "client"});
    this.requestStreamMetrics = rsocket_rpc_metrics.timed(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "requestStream"}, {"role": "client"});
    this.streamingRequestSingleResponseTrace = rsocket_rpc_tracing.trace(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "streamingRequestSingleResponse"}, {"rsocket.rpc.role": "client"});
    this.streamingRequestSingleResponseMetrics = rsocket_rpc_metrics.timed(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "streamingRequestSingleResponse"}, {"role": "client"});
    this.streamingRequestAndResponseTrace = rsocket_rpc_tracing.trace(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "streamingRequestAndResponse"}, {"rsocket.rpc.role": "client"});
    this.streamingRequestAndResponseMetrics = rsocket_rpc_metrics.timed(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "streamingRequestAndResponse"}, {"role": "client"});
  }
  // Request / Response
  SimpleServiceClient.prototype.requestReply = function requestReply(message, metadata) {
    const map = {};
    return this.requestReplyMetrics(
      this.requestReplyTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.rsocket.rpc.testing.SimpleService', 'RequestReply', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return simple_pb.SimpleResponse.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Fire-and-Forget
  SimpleServiceClient.prototype.fireAndForget = function fireAndForget(message, metadata) {
    const map = {};
    return this.fireAndForgetMetrics(
      this.fireAndForgetTrace(map)(new rsocket_flowable.Single(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.rsocket.rpc.testing.SimpleService', 'FireAndForget', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestResponse({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return google_protobuf_empty_pb.Empty.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Single Request / Streaming Response
  SimpleServiceClient.prototype.requestStream = function requestStream(message, metadata) {
    const map = {};
    return this.requestStreamMetrics(
      this.requestStreamTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf = Buffer.from(message.serializeBinary());
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf = rsocket_rpc_frames.encodeMetadata('io.rsocket.rpc.testing.SimpleService', 'RequestStream', tracingMetadata, metadata || Buffer.alloc(0));
          this._rs.requestStream({
            data: dataBuf,
            metadata: metadataBuf
          }).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return simple_pb.SimpleResponse.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Streaming Request / Single Response
  SimpleServiceClient.prototype.streamingRequestSingleResponse = function streamingRequestSingleResponse(messages, metadata) {
    const map = {};
    return this.streamingRequestSingleResponseMetrics(
      this.streamingRequestSingleResponseTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf;
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf ;
          this._rs.requestChannel(messages.map(function (message) {
            dataBuf = Buffer.from(message.serializeBinary());
            metadataBuf = rsocket_rpc_frames.encodeMetadata('io.rsocket.rpc.testing.SimpleService', 'StreamingRequestSingleResponse', tracingMetadata, metadata || Buffer.alloc(0));
            return {
              data: dataBuf,
              metadata: metadataBuf
            };
          })).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return simple_pb.SimpleResponse.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  // Streaming Request / Streaming Response
  SimpleServiceClient.prototype.streamingRequestAndResponse = function streamingRequestAndResponse(messages, metadata) {
    const map = {};
    return this.streamingRequestAndResponseMetrics(
      this.streamingRequestAndResponseTrace(map)(new rsocket_flowable.Flowable(subscriber => {
        var dataBuf;
        var tracingMetadata = rsocket_rpc_tracing.mapToBuffer(map);
        var metadataBuf ;
          this._rs.requestChannel(messages.map(function (message) {
            dataBuf = Buffer.from(message.serializeBinary());
            metadataBuf = rsocket_rpc_frames.encodeMetadata('io.rsocket.rpc.testing.SimpleService', 'StreamingRequestAndResponse', tracingMetadata, metadata || Buffer.alloc(0));
            return {
              data: dataBuf,
              metadata: metadataBuf
            };
          })).map(function (payload) {
            //TODO: resolve either 'https://github.com/rsocket/rsocket-js/issues/19' or 'https://github.com/google/protobuf/issues/1319'
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return simple_pb.SimpleResponse.deserializeBinary(binary);
          }).subscribe(subscriber);
        })
      )
    );
  };
  return SimpleServiceClient;
}();

exports.SimpleServiceClient = SimpleServiceClient;

var SimpleServiceServer = function () {
  function SimpleServiceServer(service, tracer, meterRegistry) {
    this._service = service;
    this._tracer = tracer;
    this.requestReplyTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "requestReply"}, {"rsocket.rpc.role": "server"});
    this.requestReplyMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "requestReply"}, {"role": "server"});
    this.fireAndForgetTrace = rsocket_rpc_tracing.traceSingleAsChild(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "fireAndForget"}, {"rsocket.rpc.role": "server"});
    this.fireAndForgetMetrics = rsocket_rpc_metrics.timedSingle(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "fireAndForget"}, {"role": "server"});
    this.requestStreamTrace = rsocket_rpc_tracing.traceAsChild(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "requestStream"}, {"rsocket.rpc.role": "server"});
    this.requestStreamMetrics = rsocket_rpc_metrics.timed(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "requestStream"}, {"role": "server"});
    this.streamingRequestSingleResponseTrace = rsocket_rpc_tracing.traceAsChild(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "streamingRequestSingleResponse"}, {"rsocket.rpc.role": "server"});
    this.streamingRequestSingleResponseMetrics = rsocket_rpc_metrics.timed(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "streamingRequestSingleResponse"}, {"role": "server"});
    this.streamingRequestAndResponseTrace = rsocket_rpc_tracing.traceAsChild(tracer, "SimpleService", {"rsocket.rpc.service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "streamingRequestAndResponse"}, {"rsocket.rpc.role": "server"});
    this.streamingRequestAndResponseMetrics = rsocket_rpc_metrics.timed(meterRegistry, "SimpleService", {"service": "io.rsocket.rpc.testing.SimpleService"}, {"method": "streamingRequestAndResponse"}, {"role": "server"});
    this._channelSwitch = (payload, restOfMessages) => {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      let deserializedMessages;
      switch(method){
        case 'StreamingRequestSingleResponse':
          deserializedMessages = restOfMessages.map(payload => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return simple_pb.SimpleRequest.deserializeBinary(binary);
          });
          return this.streamingRequestSingleResponseMetrics(
            this.streamingRequestSingleResponseTrace(spanContext)(
              this._service
                .streamingRequestSingleResponse(deserializedMessages, payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                })
              )
            );
        case 'StreamingRequestAndResponse':
          deserializedMessages = restOfMessages.map(payload => {
            var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
            return simple_pb.SimpleRequest.deserializeBinary(binary);
          });
          return this.streamingRequestAndResponseMetrics(
            this.streamingRequestAndResponseTrace(spanContext)(
              this._service
                .streamingRequestAndResponse(deserializedMessages, payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                })
              )
            );
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    };
  }
  SimpleServiceServer.prototype.fireAndForget = function fireAndForget(payload) {
    throw new Error('fireAndForget() is not implemented');
  };
  SimpleServiceServer.prototype.requestResponse = function requestResponse(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Single.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'RequestReply':
          return this.requestReplyMetrics(
            this.requestReplyTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .requestReply(simple_pb.SimpleRequest.deserializeBinary(binary), payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                }).subscribe(subscriber);
              }
            )
          )
        );
        case 'FireAndForget':
          return this.fireAndForgetMetrics(
            this.fireAndForgetTrace(spanContext)(new rsocket_flowable.Single(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .fireAndForget(simple_pb.SimpleRequest.deserializeBinary(binary), payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                }).subscribe(subscriber);
              }
            )
          )
        );
        default:
          return rsocket_flowable.Single.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Single.error(error);
    }
  };
  SimpleServiceServer.prototype.requestStream = function requestStream(payload) {
    try {
      if (payload.metadata == null) {
        return rsocket_flowable.Flowable.error(new Error('metadata is empty'));
      }
      var method = rsocket_rpc_frames.getMethod(payload.metadata);
      var spanContext = rsocket_rpc_tracing.deserializeTraceData(this._tracer, payload.metadata);
      switch (method) {
        case 'RequestStream':
          return this.requestStreamMetrics(
            this.requestStreamTrace(spanContext)(new rsocket_flowable.Flowable(subscriber => {
              var binary = !payload.data || payload.data.constructor === Buffer || payload.data.constructor === Uint8Array ? payload.data : new Uint8Array(payload.data);
              return this._service
                .requestStream(simple_pb.SimpleRequest.deserializeBinary(binary), payload.metadata)
                .map(function (message) {
                  return {
                    data: Buffer.from(message.serializeBinary()),
                    metadata: Buffer.alloc(0)
                  }
                }).subscribe(subscriber);
              }
            )
          )
        );
        default:
          return rsocket_flowable.Flowable.error(new Error('unknown method'));
      }
    } catch (error) {
      return rsocket_flowable.Flowable.error(error);
    }
  };
  SimpleServiceServer.prototype.requestChannel = function requestChannel(payloads) {
    return new rsocket_flowable.Flowable(s => payloads.subscribe(s)).lift(s =>
      new rsocket_rpc_core.SwitchTransformOperator(s, (payload, flowable) => this._channelSwitch(payload, flowable)),
    );
  };
  SimpleServiceServer.prototype.metadataPush = function metadataPush(payload) {
    return rsocket_flowable.Single.error(new Error('metadataPush() is not implemented'));
  };
  return SimpleServiceServer;
}();

exports.SimpleServiceServer = SimpleServiceServer;

