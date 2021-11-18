import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';

const swaggerOptions = options =>
  routingControllersToSpec(getMetadataArgsStorage(), options, {
    components: {
      schemas: validationMetadatasToSchemas({
        classTransformerMetadataStorage: defaultMetadataStorage,
        refPointerPrefix: '#/components/schemas/',
      }),
      securitySchemes: {
        basicAuth: { scheme: 'basic', type: 'http' },
      },
    },
    info: {
      description: 'Generated with `routing-controllers-openapi`',
      title: 'A sample API',
      version: '1.0.0',
    },
  });

export default swaggerOptions;
